import ReactMarkdown from 'react-markdown';

export function MarkdownText({ children }) {
    return (
        <ReactMarkdown
            components={{
                a: ({ node, ...props }) => (
                    <a
                        {...props}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#0292B7', textDecoration: 'underline', fontWeight: 'bold' }}
                    >
                        {props.children}
                    </a>
                )
            }}
        >
            {children}
        </ReactMarkdown>
    );
}
