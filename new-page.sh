#!/bin/bash

if [[ "$1" == *".mdx"* ]]; then
    echo "Please supply a file name WITHOUT the .mdx extension"
    exit 1;
fi


if [[ -f "pages/$1.mdx" ]]; then
    echo "The file pages/$1.mdx already exists"
    exit 1
else 
    cp pages/_template.mdx pages/$1.mdx 
    echo "Created $1.mdx. Fill in the meta object to setup the SEO for this page correctly"
    exit 0
fi