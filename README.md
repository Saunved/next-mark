## Welcome to my blog!

Welcome to my blog! You can find most of my writings here. If you want to create your own website using this one as a template, I am still working on making it more intuitive overall.

Feel free to create an issue if something's confusing and I will try to help you out.


## Details about this project
- Most of this was coded during the Christmas vacation of 2022
- Using Next.js + MDX
- I've tried to keep the codebase as modular as possible - PRs are welcome

## TODO

- [x] Implement pagination of some kind
- [x] Implement email subscriptions  
- [x] [low priority] Implement breadcrumbs  
- [x] Fix issue with dark mode having "Sun" as the default icon for some reason  
- [x] Implement next/seo (especially canonical URLs)
- [x] Implement a system to index/not index certain posts (use page: true in frontmatter)
- [x] Implement wikilinks parsing
- [x] Create a RelatedPosts section beneath each blog post (using tags)
- [x] Consider using remark (https://github.com/remarkjs/remark) directly instead of the next-mdx-remote package. This package is causing an overhead when integrating any new plugins, and isn't really helpful since I don't actually need any remote files to be fetched
- [x] HTML is not rendering in any of the files, it should be allowed and trusted
- [x] Fix the "Tags" page (use the new logic)
- [x] Fix the "Related posts" logic
- [x] Add a max height for the blog post images
- [x] Remove unused libraries
- [x] Implement automatic folder-based navigation (instead of tag-based navigation)
- [x] Scrolling behaviour on mobile is weird, check and fix
- [x] Add support for image captions
- [x] Support alias/aliases frontmatter key for redirects
- [x] Create better-looking index pages if possible [low priority]
- [x] Do an accessibility audit
- [ ] Add support for RSS feed
- [ ] Generate sitemap
- [ ] Make feed type configurable (feed.type) 
- [ ] Process blog config via yaml
- [ ] Setup email collector config via yaml
- [ ] Add support for Table of Contents (low priority)
- [ ] Implement a global search [low priority]
- [ ] Implement a "Likes" system  
- [ ] Implement a "Comments" system  
