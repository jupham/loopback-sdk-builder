/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SDKModule } from './shared/sdk';
import { User, AccessToken } from './shared/sdk/models';
import { UserApi } from './shared/sdk/services';

describe('Service: User Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SDKModule.forRoot()
      ]
    });
  });

  it('should contain authentication methods',
    async(inject([UserApi], (service: UserApi) => {
      expect(service).toBeTruthy();
      expect(service.login).toBeTruthy();
      expect(service.logout).toBeTruthy();
      expect(service.getAccessTokens).toBeTruthy();
      expect(service.getCurrent).toBeTruthy();
      expect(service.getCurrentId).toBeTruthy();
    })
  ));

  it('should create a new instance',
    async(inject([UserApi], (userApi: UserApi) => {
      let user: User = new User();
      user.email = Date.now() + '@test.com';
      user.password = 'test';
      return userApi.create(user)
        .subscribe((instance: User) => expect(instance.id).toBeTruthy());
    })
  ));

  it('should login the user',
    async(inject([UserApi], (userApi: UserApi) => {
      let user: User = new User();
      user.email = Date.now() + '@test.com';
      user.password = 'test';
      return userApi.create(user)
        .subscribe((instance: User)   => userApi.login(user)
        .subscribe((token: AccessToken) => {
          expect(token.id).toBeTruthy();
          expect(token.userId).toBe(instance.id);
        }));
    })
  ));

  it('should logout the user',
    async(inject([UserApi], (userApi: UserApi) => {
      let user: User = new User();
      user.email = Date.now() + '@test.com';
      user.password = 'test';
      return userApi.create(user)
        .subscribe((instance: User) => userApi.login(user)
        .subscribe((token: AccessToken)   => {
          expect(token.id).toBeTruthy();
          expect(token.userId).toBe(instance.id);
          userApi.logout().subscribe((res: boolean) => {
            expect(res).toBeTruthy();
          });
        }));
    })
  ));

  it('should fail login the user',
    async(inject([UserApi], (userApi: UserApi) => {
      return userApi.login({ email: 'not@existing.com', password: 'duh' })
        .subscribe((res) => { }, err => expect(err.status).toEqual(401));
    })
  ));

  it('should get current user',
    async(inject([UserApi], (userApi: UserApi) => {
      let user: User = new User();
      user.email = Date.now() + '@test.com';
      user.password = 'test';
      return userApi.create(user)
        .subscribe((instance: User) => userApi.login(user)
        .subscribe((token: AccessToken) =>
          userApi.getCurrent().subscribe((current: User) => {
          expect(current.id).toBe(instance.id);
        }))
      );
  })));
});
