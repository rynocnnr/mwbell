# Jekyll/Gulp/Sass/Foundation5.5.3/Browser-Sync Boilerplate

This repo was built to make it easier to stand up a site using Jekyll/Gulp/Sass/Foundation5.5.3 to expedite our build process.

## Instructions

#### 1) Clone this repo.
Go to your projects directory and run the following command in terminal:

```
git clone git@github.ark.org:design/Jekyll-Gulp-Sass-Foundation5.5.3-Browser-Sync.git
```

#### 2) Create a new GitHub repo.

#### 3) Remove the .git directory from your local copy.
Run the following command in terminal:

```
cd <new project directory>
```

```
rm -rf .git
```

#### 4) Initialize new git project.
Run the following command in terminal:

```
git init
```

```
git add .
```

```
git commit -m "Initial Commit"
```

```
git remote add origin <new repo origin>
```

```
git push -u origin master
```

#### 5) Install Jekyll

```
gem install jekyll
```

#### 6) Install the npm package.
Run the following command in terminal:

```
npm install
```

#### 7) Run Gulp
Run the following command in terminal:

```
gulp
```

#### 8) Build your new site!

## Help

If something doesn't seem right after these steps, contact Ryan for further assistance.

You may get errors if you have not used this computer for a Sass project before. These errors may be caused by missing dependencies. See dependencies below for assistance with installing those.

## Dependencies

#### 1) Xcode  
**Step 1** - Install XCode by downloading it from [here](https://itunes.apple.com/au/app/xcode/id497799835?mt=12).

**Step 2** - Install Command Line tools by running the following command in terminal:

```
xcode-select --install
```
#### 2) Homebrew
Run the following command in terminal:

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

#### 1) Node.js
Run the following command in terminal:

```
gem install node
```
