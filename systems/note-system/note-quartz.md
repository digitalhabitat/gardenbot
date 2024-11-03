# Obsidian Quartz Configuration

Following a pattern similar to https://oliverfalvai.com/evergreen/my-quartz-+-obsidian-note-publishing-setup


```
gardenbot (obsidian vault)
├── quartz (git subtree)
│   ├── .github
│   ├── docs
│   ├── node_modules
│   ├── public (git ingored)
│   ├── quartz
|   |   └── components
|   |       ├── index.ts
|   |       └── LinksHeader.txt
|   |       └── styles
|   |           └── linksHeader.scss
|   ├── quartz.config.ts
│   └── quartz.layout.ts
├── .obsidian
├── Attachments
├── _redirects
└── index.md
```

# Configured Files for Customizations

- [gadenbot/quartz/quartz/components/styles/linksHeader.csss](../../quartz/quartz/components/styles/linksHeader.scss)
- [gadenbot/quartz/quartz/components/index.ts](../../quartz/quartz/components/index.ts)
- [gadenbot/quartz/quartz/components/LinksHeader.tsx](../../quartz/quartz/components/LinksHeader.tsx)
- [gadenbot/quartz/quartz.layout.ts](../../quartz/quartz.layout.ts)
- [gadenbot/quartz/quartz.config.ts](../../quartz/quartz.layout.ts)

## Local Testing

- Build and start server on local host
```bash
cd gardenbot/quartz
npx quartz build --directory=../. --serve
```



