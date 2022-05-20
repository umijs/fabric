import Authorized from './Authorized';
import check from './CheckPermissions';
import renderAuthorize from './renderAuthorize';
import Secured from './Secured';

Authorized.Secured = Secured;
Authorized.check = check;

const RenderAuthorize = renderAuthorize(Authorized);

export default RenderAuthorize;
