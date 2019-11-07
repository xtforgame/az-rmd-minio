import ServiceBase from '../ServiceBase';
// ========================================
import FileRouter from '~/routers/FileRouter';
import MainRouter from '~/routers/MainRouter';
import SessionRouter from '~/routers/SessionRouter';
import UserRouter from '~/routers/UserRouter';
import UserSettingRouter from '~/routers/UserSettingRouter';
import RecoveryRouter from '~/routers/RecoveryRouter';
import OrganizationRouter from '~/routers/OrganizationRouter';
import ProjectRouter from '~/routers/ProjectRouter';
import MemoRouter from '~/routers/MemoRouter';
import ModuleComplierRouter from '~/routers/ModuleComplierRouter';

export default class RouterManager extends ServiceBase {
  static $name = 'routerManager';

  static $type = 'service';

  static $inject = ['httpApp', 'mailer', 'minioApi'];

  constructor(httpApp, mailer, minioApi) {
    super();
    this.mailer = mailer;
    this.minioApi = minioApi;

    this.routers = [
      FileRouter,
      MainRouter,
      SessionRouter,
      UserRouter,
      UserSettingRouter,
      RecoveryRouter,
      OrganizationRouter,
      ProjectRouter,
      MemoRouter,
      ModuleComplierRouter,
    ]
    .map(Router => new Router({
      httpApp,
      mailer: this.mailer,
      minioApi: this.minioApi,
    }).setupRoutes(httpApp.appConfig));
  }

  onStart() {
  }

  onDestroy() {
  }
}
