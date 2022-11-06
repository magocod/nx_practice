import { Injectable } from '@nestjs/common';

@Injectable()
export class MyLibraryService {
  call(): number {
    return 1
  }
}
