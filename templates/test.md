
<%*
const dv = app.plugins.plugins["dataview"].api;
// Add as many filenames and queries as you'd like!
const fileAndQuery = new Map([
  [
    "encoder-assembly-parts-list",
    'TABLE WITHOUT ID component-type, description, source-files, drawing-files, supplier-link FROM csv("docs/ref-docs/parts-list-rev1.csv") WHERE sub-assembly = "encoder"',
  ],
  [
    "Recently Edited",
    'TABLE WITHOUT ID "[[" + file.name + "]]" AS Note, dateformat(file.mtime, "ff") AS Modified FROM "" SORT file.mtime desc LIMIT 7',
  ],
]);

await fileAndQuery.forEach(async (query, filename) => {
  if (!tp.file.find_tfile(filename)) {
    await tp.file.create_new("", filename);
    new Notice(`Created ${filename}.`);
  }
  const tFile = tp.file.find_tfile(filename);
  const queryOutput = await dv.queryMarkdown(query);
  const fileContent = `%% Updated via "test" template %% \n\n${queryOutput.value}`;
  try {
    await app.vault.modify(tFile, fileContent);
    new Notice(`Updated ${tFile.basename}.`);
  } catch (error) {
    new Notice("⚠️ ERROR updating! Check console. Skipped file: " + filename , 0);
  }
});
%>
