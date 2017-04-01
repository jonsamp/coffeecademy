echo "=== BUILDING DIST ==="
npm run dist

echo "=== PUSHING TO GIT ==="
git commit -am "Deploying"
git push

echo "=== PUBLISHING to gh-pages ==="
git subtree push --prefix dist origin gh-pages
