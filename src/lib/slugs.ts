export function postSlug(id: string): string {
  return id.replace(/^\d+_/, '').replace(/_/g, '-');
}

export function postUrl(post: { id: string; data: { categories: string[] } }): string {
  return `/blog/${post.data.categories[0]}/${postSlug(post.id)}/`;
}
