# obsidian git 

>https://publish.obsidian.md/git-doc/Authentication
[Fine-grained personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

### Start a GitHub repository and a obsidian vault

- #TODO

### Utilize a `.gitignore` file

- This helps avoid populating commits with unnecessary changes

```.gitignore
# to exclude Obsidian's settings (including plugin and hotkey configurations)
#.obsidian/

# to only exclude plugin configuration. Might be useful to prevent some plugin from exposing sensitive data
.obsidian/plugins

# OR only to exclude workspace cache
.obsidian/workspace.json

# to exclude workspace cache specific to mobile devices
.obsidian/workspace-mobile.json

# Add below lines to exclude OS settings and caches
.trash/
.DS_Store

# Exclude Untitled Notes
Untitled*

# Exclude "bad" names
null*
```

### Verify your using `https` for the remote repositry URL. 

```sh
$ git remote -v
origin	https://github.com/<username>/<repo>.git (fetch)
origin	https://github.com/<username>/<repo>.git (push)
```

If the above code block is not similar use the example below to modify it.

```sh
git remote set-url origin `https://github.com/<username>/<repo>.git`
```

### Create a fine-grained PAT

- [Fine-grain PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-fine-grained-personal-access-token) in GitHub [Settings / Developer Settings](https://github.com/settings/apps) 
- Under `Permissions` choose `Repository permissions` and set only `Contents` to `Access level` -> `Read and write`. This gives give permission to push to the repository.

### Install libsecret

- Since `https` is being used 

```sh
git config --global credential.helper libsecret
```

- If the above e

```sh
sudo apt install libsecret-1-0 libsecret-1-dev make gcc sudo make --directory=/usr/share/doc/git/contrib/credential/libsecret

# NOTE: This changes your global config, in case you don't want that you can omit the `--global` and execute it in your existing git repository. 
git config --global credential.helper \ /usr/share/doc/git/contrib/credential/libsecret/git-credential-libsecret
```

### Verify git configuration

```sh
$ git config --global --list
user.name=Michael Miller
user.email=miketm89@gmail.com
credential.helper=/usr/share/doc/git/contrib/credential/libsecret/git-credential-libsecret
```

