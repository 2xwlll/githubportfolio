# William Olson Portfolio

Personal research portfolio website.

## About

Astrophysics undergraduate researcher working at the intersection of:

- Machine Learning
- Astronomy
- JWST observations
- Radio technosignatures

## Research

- Little Red Dots & AGN
- AI for Astronomy
- Technosignature Searches
- Scientific Machine Learning

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

## Development

Install dependencies:

```bash
npm install
```

##Run Locally

npm run dev


## Updating track and field marks

Edit [public/data/track-results.json](public/data/track-results.json) to update the interactive track on `/athletics`. See [the results guide](docs/track-results.md) for units, optional meet details, and adding results over time.

## After-hours observatory

The frog-guided mini-labs are available at `/observatory`. See [the observatory guide](docs/observatory.md) for data provenance, local exports, scientific interpretation, and updating the examples.

## Posting a research notebook update

Add an entry to [src/content/research-notebook.json](src/content/research-notebook.json). You can edit the file directly on GitHub. The homepage and research page both show the newest entry first and group the rest under **Older entries**. Updates appear when your site deploys the change.

Copy an existing entry and fill in the date (`YYYY-MM-DD`), topic, title, and a short summary. A question, what you tried, and what you learned make a good entry. The `link` field is optional. To include a longer write-up, set its `label` to something like “Read the notebook in Google Docs” and its `url` to the document’s viewer link. Check that a signed-out visitor can open the link before posting it. Add only material you’re ready to share publicly.
