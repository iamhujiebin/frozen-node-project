import MarkdownPreview from '@uiw/react-markdown-preview';

const source = `
有一些不是markdown
## MarkdownPreview

> todo: React component preview markdown text.
~~~js\n console.log(1)\n~~~
~~~go\n fmt.Println("123")\n~~~

有一些就是
`;

function Test() {
    return (
        <MarkdownPreview source={source}/>
    )
}

export default Test