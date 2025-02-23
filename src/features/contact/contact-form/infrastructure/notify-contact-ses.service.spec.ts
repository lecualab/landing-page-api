import { SESClient } from '@aws-sdk/client-ses';
import { Mocked, TestBed } from '@suites/unit';
import { NotifyContactSesService } from './notify-contact-ses.service';

describe('NotifyContactSesService', () => {
  let underTest: NotifyContactSesService;
  let sesClient: Mocked<SESClient>;

  beforeEach(async () => {
    const { unit, unitRef } = await TestBed.solitary(
      NotifyContactSesService,
    ).compile();

    underTest = unit;
    sesClient = unitRef.get(SESClient);
  });

  describe('notifyContact', () => {
    it('should send email', async () => {
      await underTest.notifyContact({} as any);

      expect(sesClient.send).toHaveBeenCalledOnce();
    });
  });
});
