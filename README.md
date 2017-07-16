# [coffeecademy](https://jonsamp.github.io/coffeecademy/)

Learn how to make craft coffee and tea.

### Mission

To create a space for craft caffeination for employees and visitors.

### Process

Design mocks:
![design mock](https://cloud.githubusercontent.com/assets/6455018/22179337/87870d70-e01e-11e6-934e-ca5286621207.png)

App architecture:
![architecture](https://cloud.githubusercontent.com/assets/6455018/22179338/975b9770-e01e-11e6-8d45-af48c58889eb.png)

## Run app locally

1. Clone the app
  ```
  git clone git@github.com:jonsamp/coffeecademy.git
  ```
2. `yarn install`
3. Run the app with `yarn start`

## Add a recipe

1. Add json to `/src/recipes`
2. Import it into to `/src/containers/ViewContainer`
3. Add recipe into `recipes` var in `/src/containers/ViewContainer`
4. Add the recipe's icon to the `brewIcons` object in `/src/containers/SummaryContainer`  

## How to deploy

Automatically:

1. Run the **deploy.sh** script in the parent folder.
  ```
  sh deploy.sh
  ```

Manually:

1. Run `yarn dist`. Wait for the app to build.
2. Test out `index.html` in **dist**.
3. Push changes to git.
3. Run `git subtree push --prefix dist origin gh-pages`
