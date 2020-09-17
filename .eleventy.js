const moment = require('moment');
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
moment.locale('en');

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(pluginSyntaxHighlight);

    eleventyConfig.addFilter('dateIso', date => {
        return moment(date).toISOString();
    });

    eleventyConfig.addFilter('dateReadable', date => {
        return moment(date).format('ll'); // E.g. May 31, 2019
    });

    // Reading time
    // https://github.com/johanbrook/eleventy-plugin-reading-time/
    eleventyConfig.addFilter('readingTime', content => {
        content = content.replace(/(<([^>]+)>)/gi, '');
        content = content.match(/[\u0400-\u04FF]+|\S+\s*/g);
        const count = content !== null ? content.length : 0;

        return Math.ceil(count / 200) + ' min'
    });

    // Record keeping for searching post by file name
    // https://gist.github.com/robdodson/c2d3c4a6bf6bf9962893760c5585a3eb
    let memo;
    const memoize = (collection) => {
        if (memo && Object.keys(memo).length) {
            /* eslint-disable-next-line */
            console.warn('Overwriting existing memoized collection!');
        }

        memo = {};
        collection.forEach((item) => {
            if (memo[item.fileSlug]) {
                throw new Error(`Found duplicate post slug: '${item.fileSlug}'`);
            }

            memo[item.fileSlug] = item;
        });

        // Just return the collection back to eleventy.
        return collection;
    };

    // Dummy collection for preparing post database
    eleventyConfig.addCollection('memoize', function(collection) {
        return memoize(collection.getAll());
    });

    // Short code for getting url of a post searched by filename
    eleventyConfig.addShortcode("link", function(filename) {
        return memo[filename].url;
    });

    // Short code for linking to external website
    eleventyConfig.addShortcode("link_out", function(text, link, title) {
        return '<a href="' + link + '" title="' + (title != undefined ? title : text) + '" target="_blank" rel="noopener">' + text + '</a>';
    });

    // Short code for code
    eleventyConfig.addShortcode("code", function(text) {
        return '<code>' + text + '</code>';
    });

    // Short code for rendering an image with caption
    eleventyConfig.addShortcode("image", function(src, alt, link, title) {
        let html = '<figure>';
        if (link) {
            html += '<a href="' + link + '" title="' + title + '" target="_blank" rel="noopener">';
        }

        html += '<img src="' + src + '" alt="' + alt + '">';
        if (link) {
            html += '</a>';
        }

        if (title) {
            html += '<span class="fig-caption">' + title + '</span>';
        }

        html += '</figure>';

        return html;
    });

    // Creating category collections
    ["code", "random", "dl", "graphics", "trading", "blender"].forEach(function(cat) {
        eleventyConfig.addCollection(cat, function(collection) {
            return collection.getAll().filter(function(item) {
                return (item.data.category != undefined) && (item.data.category.toUpperCase().includes(cat.toUpperCase()));
            });
        });
    });

    // Folders to copy to output folder
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("images");
    eleventyConfig.addPassthroughCopy("ads.txt");

    /* Markdown Overrides */
    let markdownLibrary = markdownIt({
        html: true,
        breaks: true,
        linkify: true
    }).use(markdownItAnchor, {
        permalink: true,
        permalinkClass: "anchor-link",
        permalinkSymbol: "#",
        permalinkBefore: false,
        permalinkAttrs: () => ({ "aria-hidden": false, "rel": "bookmark" })
    });
    eleventyConfig.setLibrary("md", markdownLibrary);

    // You can return your Config object (optional).
    return {
        dir: {
            input: "content",
            layouts: "_layouts"
        }
    };
};