#!/usr/bin/env bash
set -euo pipefail

npm_packages=(
  "diff-so-fancy"
  "degit"
)

github_repos=(
  "zsh-users/zsh-syntax-highlighting"
  "zsh-users/zsh-autosuggestions"
  "zsh-users/zsh-completions"
  "michaeldfallen/git-radar"
  "thecotne/foo"
)

script_path="$(readlink -f "${BASH_SOURCE[0]}")"
devcontainer_folder="$(dirname "$script_path")"
local_workspace_folder="$(dirname "$devcontainer_folder")"

mkdir -p "$HOME/.local/bin"

export NVM_DIR="/usr/local/share/nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm install --lts --latest-npm
nvm use --lts

npm i -g "${npm_packages[@]}"

for package in "${npm_packages[@]}"; do
  ln -sf "$(command -v "$package")" "$HOME/.local/bin/$package"
done

for repo in "${github_repos[@]}"; do
  repo_name=$(basename "$repo")
  degit "$repo" "$HOME/.$repo_name"
done

zshrc_link="$local_workspace_folder/.devcontainer/.zshrc"

if [ -f "$zshrc_link" ]; then
  mv "$HOME/.zshrc" "$HOME/.zshrc_bak"
  ln -sf "$zshrc_link" "$HOME/.zshrc"
fi

cd $local_workspace_folder

nvm install --default --latest-npm
