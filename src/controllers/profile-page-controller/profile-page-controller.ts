import { getProfilePageData } from '@/consts';
import { store } from '@/store';

export class ProfilePageController {
  private profilePageData: Indexed<unknown> | null = null;

  constructor() {}

  public async getProfilePageData(id: string = 'profile'): Promise<void> {
    if (id === 'profile') {
      this.profilePageData = getProfilePageData('view');
    } else if (id === 'profile-edit') {
      this.profilePageData = getProfilePageData('edit');
    } else if (id === 'profile-password') {
      this.profilePageData = getProfilePageData('password');
    }

    store.set('profilePageData', this.profilePageData);
  }
}
