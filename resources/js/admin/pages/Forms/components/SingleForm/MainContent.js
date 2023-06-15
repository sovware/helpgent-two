import ScreenBar from './ScreenBar';
import { MainContentStyle } from './style';

export default function MainContent( props ) {
	const { singleForm, setSingleForm } = props;
	return (
		<MainContentStyle>
			<ScreenBar
				singleForm={ singleForm }
				setSingleForm={ setSingleForm }
			/>
		</MainContentStyle>
	);
}
