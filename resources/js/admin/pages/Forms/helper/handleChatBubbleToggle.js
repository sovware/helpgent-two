export default function handleChatBubbleToggle(
	setDisplayChatBubble,
	setValue,
	displayChatBubble
) {
	setDisplayChatBubble( ! displayChatBubble );
	setValue( 'displayChatBubble', ! displayChatBubble );
}
