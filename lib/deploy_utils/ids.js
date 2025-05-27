export function contentIds(contentWidgetId_or_deploymentDescriptor) {
  const contentWidgetId = typeof contentWidgetId_or_deploymentDescriptor === 'string'
    ? contentWidgetId_or_deploymentDescriptor
    : contentWidgetId_or_deploymentDescriptor.locations.at(0).widget;

  let [, pageContentId, pageId, contentVersion, widgetIdx, languageId] =
    contentWidgetId.match(/((Pages_\d+)_PageContents_\d+_V_(\d+))_W_(\d+)_L_(\d+)/);

  contentVersion = Number(contentVersion);
  return {pageContentId, pageId, contentVersion, widgetIdx, languageId};
}

export function idsFromPageContentId(pageContentId) {
  let [, pageId, contentVersion] = pageContentId.match(/(Pages_\d+)_PageContents_\d+_V_(\d+)/);
  contentVersion = Number(contentVersion);
  return {pageId, contentVersion};
}
