echo "=== BUILDING DIST ==="
yarn dist

echo "=== PUSHING TO GIT ==="
git add .
git commit -am "Deploying"
git push

echo "=== PUBLISHING to gh-pages ==="
git subtree push --prefix dist origin gh-pages
