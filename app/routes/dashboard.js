import AuthenticatedRoute from './authenticated';

export default class DashboardRoute extends AuthenticatedRoute {
  resetController(controller, isExiting) {
    if (isExiting)
      controller.setProperties({
        bracelet: null,
        braceletId: null,
        data: null,
        isDataLoading: false,
        selectedDataType: 'stats',
        selectedTimeIntervalInMinutes: 60,
        selectedDate: new Date().toISOString().split('T')[0],
      });
  }
}
