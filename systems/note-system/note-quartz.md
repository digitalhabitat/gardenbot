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

## Configured Files for Customizations

- [gadenbot/quartz/quartz/components/styles/linksHeader.scss](../../quartz/quartz/components/styles/linksHeader.scss)
- [gadenbot/quartz/quartz/components/index.ts](../../quartz/quartz/components/index.ts)
- [gadenbot/quartz/quartz/components/LinksHeader.tsx](../../quartz/quartz/components/LinksHeader.tsx)
- [gadenbot/quartz/quartz.layout.ts](../../quartz/quartz.layout.ts)
- [gadenbot/quartz/quartz.config.ts](../../quartz/quartz.config.ts)

## Local Testing

- Build and start server on local host
```bash
cd ~/repo/gardenbot/quartz
npx quartz build --directory=../. --serve
```

## Updating Quartz git subtree

- Commit all currently pending changes in working tree.
- Navigate to topleve of the working tree
```bash
cd ~/repo/gardenbot
```
- Pull the upstream changes
```bash
git subtree pull --prefix=quartz https://github.com/jackyzha0/quartz.git v4 --squash
```
- Resolve merge conflicts with customized configurations files. This will always be the cause with files like `quarts.config.ts`

## Fine-grained Personal Access Token (PAT)

#todo

To enable updating notes via the [obsidian mobile app](https://obsidian.md/mobile) and the g[obisidan-git plugin](https://github.com/Vinzent03/obsidian-git). This project uses Github [Fined-grained PATs](https://github.com/settings/tokens?type=beta) because the mobile app does not support SSH authentication. 

## Github Workflow

#todo
