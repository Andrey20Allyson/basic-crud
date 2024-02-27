import { UserRepositoryMock } from '../repositories/user-repository-mock';
import { UserRepositoryType } from '../repositories/user-repository.type';
import { HashServiceMock } from '../services/hash-service-mock';
import { HashServiceType } from '../services/hash-service.type';
import { container as parentContainer } from './default-container';

export const container = parentContainer.createChild();

container
  .bind(UserRepositoryType)
  .to(UserRepositoryMock)
  .inTransientScope();

container
  .bind(HashServiceType)
  .to(HashServiceMock);