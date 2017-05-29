(function () {
  'use strict';

  describe('Pushnotis Route Tests', function () {
    // Initialize global variables
    var $scope,
      PushnotisService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _PushnotisService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      PushnotisService = _PushnotisService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('pushnotis');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/pushnotis');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          PushnotisController,
          mockPushnoti;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('pushnotis.view');
          $templateCache.put('modules/pushnotis/client/views/view-pushnoti.client.view.html', '');

          // create mock Pushnoti
          mockPushnoti = new PushnotisService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Pushnoti Name'
          });

          // Initialize Controller
          PushnotisController = $controller('PushnotisController as vm', {
            $scope: $scope,
            pushnotiResolve: mockPushnoti
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:pushnotiId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.pushnotiResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            pushnotiId: 1
          })).toEqual('/pushnotis/1');
        }));

        it('should attach an Pushnoti to the controller scope', function () {
          expect($scope.vm.pushnoti._id).toBe(mockPushnoti._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/pushnotis/client/views/view-pushnoti.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          PushnotisController,
          mockPushnoti;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('pushnotis.create');
          $templateCache.put('modules/pushnotis/client/views/form-pushnoti.client.view.html', '');

          // create mock Pushnoti
          mockPushnoti = new PushnotisService();

          // Initialize Controller
          PushnotisController = $controller('PushnotisController as vm', {
            $scope: $scope,
            pushnotiResolve: mockPushnoti
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.pushnotiResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/pushnotis/create');
        }));

        it('should attach an Pushnoti to the controller scope', function () {
          expect($scope.vm.pushnoti._id).toBe(mockPushnoti._id);
          expect($scope.vm.pushnoti._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/pushnotis/client/views/form-pushnoti.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          PushnotisController,
          mockPushnoti;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('pushnotis.edit');
          $templateCache.put('modules/pushnotis/client/views/form-pushnoti.client.view.html', '');

          // create mock Pushnoti
          mockPushnoti = new PushnotisService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Pushnoti Name'
          });

          // Initialize Controller
          PushnotisController = $controller('PushnotisController as vm', {
            $scope: $scope,
            pushnotiResolve: mockPushnoti
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:pushnotiId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.pushnotiResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            pushnotiId: 1
          })).toEqual('/pushnotis/1/edit');
        }));

        it('should attach an Pushnoti to the controller scope', function () {
          expect($scope.vm.pushnoti._id).toBe(mockPushnoti._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/pushnotis/client/views/form-pushnoti.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
