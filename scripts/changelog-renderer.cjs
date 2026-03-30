const DefaultChangelogRenderer = require('nx/release/changelog-renderer').default;

class PlainChangelogRenderer extends DefaultChangelogRenderer {
  async render() {
    const markdown = await super.render();

    return markdown
      .replace(/^### ⚠️\s+Breaking Changes$/m, '### Breaking Changes')
      .replace(/^### 🧱 Updated Dependencies$/m, '### Updated Dependencies')
      .replace(/^### ❤️ Thank You$/m, '### Thank You')
      .replace(/^- ⚠️\s+/gm, '- ');
  }
}

module.exports = PlainChangelogRenderer;
