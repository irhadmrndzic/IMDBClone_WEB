import { TestBed } from '@angular/core/testing';

import { MoviesShowsServiceService } from './movies-shows-service.service';

describe('MoviesShowsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoviesShowsServiceService = TestBed.get(MoviesShowsServiceService);
    expect(service).toBeTruthy();
  });
});
