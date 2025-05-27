import path from "path";
import {findUpSync, pathExistsSync} from 'find-up';
import {
  cms_widget_container_template_by_brand,
  default_assets_dir,
  default_assets_path,
  default_cdn_assets_url_by_brand
} from '../constants.js';

export function conformPageDescriptorToExpectedFormat(pd, cwd) {
  let process_cwd = process.cwd();
  if (typeof pd.contents === 'string') {
    pd.contents = [pd.contents];
  }
  if (!pd.env) pd.env = {};
  if (!pd.env.brand) {
    const found_path = findUpSync(p => {
      let {base} = path.parse(p);
      if (['coral.ru', 'coral', 'sunmar.ru', 'sunmar'].includes(base)) return p;
    }, {type: 'directory', cwd: cwd});
    const {name: brand} = found_path ? path.parse(found_path) : {};
    pd.env.brand = brand || 'coral';
  }
  if (!pd.env.pageTemplate) pd.env.pageTemplate = 'content';
  if (!pd.env.localAssetsPath) {
    let local_assets_path = path.join(cwd, default_assets_dir);
    if (!pathExistsSync(local_assets_path)) {
      local_assets_path = findUpSync(default_assets_dir, {type: 'directory', cwd: cwd});
    }
    pd.env.localAssetsPath = local_assets_path && ('/' + path.relative(process_cwd, local_assets_path).replaceAll(path.sep, '/')) || default_assets_path;
  }
  if (!pd.env.cdnAssetsURL) {
    pd.env.cdnAssetsURL = default_cdn_assets_url_by_brand[pd.env.brand] + '/' + path.basename(process_cwd);
  }
  if (!pd.env.cmsWidgetContainer) {
    pd.env.cmsWidgetContainer = cms_widget_container_template_by_brand[pd.env.brand];
  }
  if (pd.env.sourcemaps === undefined) {
    pd.env.sourcemaps = true;
  }
}
