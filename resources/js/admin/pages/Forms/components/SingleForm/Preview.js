import ReactSVG from 'react-inlinesvg';
import useStore from '@hooks/useStore';
import { useSingleFormState } from '../../context/SingleFormStateContext';
import MediaPreview from './MediaPreview';
import QuestionPreview from './QuestionPreview';
import PreviewDeviceControl from './PreviewDeviceControl';
import handDown from '@icon/hand-down.svg';
import { PreviewStyle } from './style';
export default function Preview() {
	const { singleFormState } = useSingleFormState();
	const { singleForm, activeScreenId } = singleFormState;
	const { questions } = JSON.parse( singleForm.content );
	const selectedQuestion = questions.filter(
		( item ) => item.id === activeScreenId
	);

	const { getStoreData } = useStore();

	const layoutMode = getStoreData( [ 'helpgent-layoutMode' ] );

	return (
		<PreviewStyle>
			<div className="helpgent-preview-top">
				<ReactSVG src={ handDown } />
				<span className="helpgent-preview-top__text">
					Preview your changes
				</span>
			</div>
			<div
				className={ `helpgent-preview-container helpgent-preview-${ layoutMode }` }
			>
				{ selectedQuestion[ 0 ].screen_type !== 'end' && (
					<MediaPreview />
				) }

				<QuestionPreview selectedQuestion={ selectedQuestion[ 0 ] } />
			</div>
			<PreviewDeviceControl />
		</PreviewStyle>
	);
}
