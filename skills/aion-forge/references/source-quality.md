# Source Quality

Use this hierarchy to weight evidence.

## Strong

- Official product docs, API docs, standards, regulations, clinical or industry guidelines.
- Internal incidents, customer complaints, support tickets, logs, and workflow observations.
- Reproducible benchmark data, peer-reviewed papers, and mature postmortems.

## Medium

- Maintainer comments in GitHub issues or pull requests.
- Release notes, changelogs, design docs, architecture records.
- Competitor docs that reveal concrete workflow behavior.

## Weak

- Marketing pages, broad thought leadership, forum anecdotes, social posts, unverified complaints.

## Handling

- Use strong evidence for build decisions.
- Use medium evidence for hypotheses and prototype justification.
- Use weak evidence to form questions or identify areas to investigate.
- Always record limitations, date/version, and confidence.
