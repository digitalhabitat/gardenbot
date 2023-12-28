# obsidian git 

- https://publish.obsidian.md/git-doc/Authentication
- [Fine-grained personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

### Start a GitHub repository and a obsidian vault

- I already had an obsidian vault synced to a GitHub repository. In this procedure I am just laying out what I did to start use the obsidian git plugin.

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

### Verify your using `https` for the remote repository URL. 

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

- Since `https` is being used we need to way to automate entering in the username and password every time we try to push to the repository.

```sh
git config --global credential.helper libsecret
```

- If the above example does not work try this one below.

```sh
sudo apt install libsecret-1-0 libsecret-1-dev make gcc sudo make --directory=/usr/share/doc/git/contrib/credential/libsecret

# NOTE: This changes your global config, in case you don't want that you can omit the `--global` and execute it in your existing git repository. 
git config --global credential.helper \ /usr/share/doc/git/contrib/credential/libsecret/git-credential-libsecret
```

### Verify git configuration

- git config --global --list

```
$ git config --global --list
user.name=Michael Miller
user.email=miketm89@gmail.com
credential.helper=/usr/share/doc/git/contrib/credential/libsecret/git-credential-libsecret
```

- Once you have libsecret setup and perform a `git push` you will be prompted to input the username and password (use the PAT from previous step). After you do this **once** libsecret will remember and start passing them automatically.

```
$ git push
Username for 'https://github.com': digitalhabitat
Password for 'https://digitalhabitat@github.com': 
```

### Extras

I was curious to learn more about libsecret and how it manages the stored credentials. It turns out that you can use `secret-tool` to do exactly that. First install the tool with the example below.

```
sudo apt install libsecret-tools -y
```

However, the usage text is not extremely helpful.

```
$ secret-tool
usage: secret-tool store --label='label' attribute value ...
       secret-tool lookup attribute value ...
       secret-tool clear attribute value ...
       secret-tool search [--all] [--unlock] attribute value ...
       secret-tool lock --collection='collection'
```

In this example, am able to pull the credentials for my specified GitHub username. It might not be obvious but on closer inspection you will notice that there are no attributes stored that could differentiate the same user, on the same hosting provider, but accessing a different repository. I am not entirely certain but I imagine that the PAT for specific repositories will have issues utilizing libsecret because libsecret has no way of knowing which repository specific PAT to use or may fail to authenticate altogether because its using the wrong repository specific PAT.

```
$ secret-tool search --all user digitalhabitat
[/8]
label = Git: https://github.com/
secret = <password from PAT>
created = 2023-12-27 20:35:22
modified = 2023-12-27 23:39:20
schema = org.gnome.keyring.NetworkPassword
attribute.protocol = https
attribute.user = digitalhabitat
attribute.server = github.com
```