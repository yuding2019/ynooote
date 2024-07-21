import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="zh-cn">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
        <script
          id="codeGPTWidgetScript"
          type="module"
          async
          src="https://widget.codegpt.co/chat-widget.js"
          defer
          data-widget-id="323b5e21-0614-4af3-a22c-b6597fbcfc62"
        />
      </Html>
    );
  }
}

export default MyDocument;
