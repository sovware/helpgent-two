import ReactSVG from 'react-inlinesvg';
import monitor from '@icon/monitor.svg';
import tablet from '@icon/tablet.svg';
import mobile from '@icon/mobile.svg';
import { PreviewDeviceControlStyle } from './style.js';
export default function PreviewDeviceControl() {
	return (
		<PreviewDeviceControlStyle>
			<span className="helpgent-device-action">
				<ReactSVG src={ monitor } />
			</span>
			<span className="helpgent-device-action">
				<ReactSVG src={ tablet } />
			</span>
			<span className="helpgent-device-action">
				<ReactSVG src={ mobile } />
			</span>
		</PreviewDeviceControlStyle>
	);
}
