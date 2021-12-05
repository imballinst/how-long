import parse from 'html-react-parser';
import domToReact from 'html-react-parser/lib/dom-to-react';
import { Fragment } from 'react';
import { Link } from '../../components/Links';
import { Text } from '../../components/Typography';

export function htmlToReact(text: string) {
  return parse(text, {
    replace: (domNodeArg) => {
      const domNode = domNodeArg as any;
      const firstChild = domNode.prev === null && domNode.parent === null;

      if (domNode.children && domNode.children.length > 1) {
        return (
          <Text className={firstChild ? 'inline' : undefined}>
            {domNode.children.map((child: any, idx: number) =>
              recursiveParse(child, idx)
            )}
          </Text>
        );
      } else if (domNode.name === 'p') {
        return (
          <Text className={firstChild ? 'inline' : undefined}>
            {domNode.children[0].data}
          </Text>
        );
      } else if (domNode.name === 'a') {
        return (
          <Link href={domNode.attribs.href} isExternal>
            {domToReact(domNode.children)}
          </Link>
        );
      }

      return domNode;
    },
    trim: true
  });
}

// Helper functions.
function recursiveParse(node: any, idx: number) {
  if (node.children && node.children.length > 1) {
    return node.children.map((child: any, index: number) =>
      recursiveParse(child, index)
    );
  } else if (node.data !== undefined) {
    return <Fragment key={idx}>{node.data}</Fragment>;
  } else if (node.name === 'a') {
    return (
      <Link href={node.attribs.href} isExternal key={idx}>
        {domToReact(node.children)}
      </Link>
    );
  }

  return node;
}
