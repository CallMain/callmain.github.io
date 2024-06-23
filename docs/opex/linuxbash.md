# Linux下Bash优化

::: tip
基于Deepin V20操作系统
:::

## Bash添加操作别名

修改文件`~/.bashrc`，在末尾添加如下内容：

``` bash
alias ll='ls -l';
alias lla='ls -la';
alias ..='cd ..'
alias ...='cd ../../..'
alias ....='cd ../../../..'
alias .....='cd ../../../../..'
alias .2='cd ../..'
alias .3='cd ../../..'
alias .4='cd ../../../..'
alias .5='cd ../../../../..'
alias now='date "+%Y-%m-%d %H:%M:%S.%s"'
alias timestamp='now; echo s: $(date +"%s"); echo ms: $(echo `expr \`date +%s%N\` / 1000000`)'
alias svim='sudo vim'
alias ports='netstat -tulanp'
alias smv='sudo mv'
alias scp='sudo cp'
alias srm='sudo rm'
alias update='sudo apt update'
alias upgrade='sudo apt upgrade'
alias psg='ps -ef | grep '
alias du1='du -l -d 1'
alias du2='du -l -d 2'
alias du3='du -l -d 3'
alias du4='du -l -d 4'
alias meminfo='free -h -l -t'
alias cpuinfo='lscpu'
alias psmem='ps auxf | sort -nr -k 4'
alias psmem10='ps auxf | sort -nr -k 4 | head -10'
alias pscpu='ps auxf | sort -nr -k 3'
alias pscpu10='ps auxf | sort -nr -k 3 | head -10'
alias dfn='df -h; free -h -l -t; netstat -tulanp'

alias gs="git status"
alias ga="git add"
alias gc="git commit -m"
alias gp="git push"
alias gl="git pull"
alias tf='tail -f'
alias np='Notepad-- '
alias snp="sudo Notepad-- "
```
## 补全失效

1. 用户目录下`~/.bash.rc`文件添加如下内容

```bash
# enable bash completion in interactive shells
if ! shopt -oq posix; then
  if [ -f /usr/share/bash-completion/bash_completion ]; then
    . /usr/share/bash-completion/bash_completion
  elif [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
  fi
fi
```

2. 系统目录下`/etc/bash.bashrc`文件放开如下内容

```bash
# enable bash completion in interactive shells
if ! shopt -oq posix; then
  if [ -f /usr/share/bash-completion/bash_completion ]; then
    . /usr/share/bash-completion/bash_completion
  elif [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
  fi
fi
```