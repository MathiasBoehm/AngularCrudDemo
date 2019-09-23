import { TestBed } from '@angular/core/testing';

import { PostStoreService } from './post-store.service';

describe('PostStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostStoreService = TestBed.get(PostStoreService);
    expect(service).toBeTruthy();
  });
});
