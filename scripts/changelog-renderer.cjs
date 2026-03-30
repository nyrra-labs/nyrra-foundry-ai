const DefaultChangelogRenderer = require('nx/release/changelog-renderer').default;

class PlainChangelogRenderer extends DefaultChangelogRenderer {
  renderBreakingChanges() {
    const uniqueBreakingChanges = Array.from(new Set(this.breakingChanges));

    return ['### Breaking Changes', '', ...uniqueBreakingChanges];
  }

  renderDependencyBumps() {
    const markdownLines = ['', '### Updated Dependencies', ''];

    this.dependencyBumps.forEach(({ dependencyName, newVersion }) => {
      markdownLines.push(`- Updated ${dependencyName} to ${newVersion}`);
    });

    return markdownLines;
  }

  async renderAuthors() {
    const markdownLines = [];
    const authorsByName = new Map();

    for (const change of [...this.relevantChanges, ...this.additionalChangesForAuthorsSection]) {
      if (!change.authors) {
        continue;
      }

      for (const author of change.authors) {
        const name = this.formatName(author.name);

        if (!name || name.includes('[bot]')) {
          continue;
        }

        if (authorsByName.has(name)) {
          authorsByName.get(name).email.add(author.email);
          continue;
        }

        authorsByName.set(name, {
          email: new Set([author.email]),
        });
      }
    }

    if (
      this.remoteReleaseClient.getRemoteRepoData() &&
      this.changelogRenderOptions.applyUsernameToAuthors &&
      this.remoteReleaseClient.remoteReleaseProviderName === 'GitHub'
    ) {
      await this.remoteReleaseClient.applyUsernameToAuthors(authorsByName);
    }

    const authors = [...authorsByName.entries()].map(([name, metadata]) => ({
      name,
      ...metadata,
    }));

    if (authors.length > 0) {
      markdownLines.push(
        '',
        '### Thank You',
        '',
        ...authors
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((author) => {
            const username = author.username ? ` @${author.username}` : '';
            return `- ${author.name}${username}`;
          }),
      );
    }

    return markdownLines;
  }
}

module.exports = PlainChangelogRenderer;
