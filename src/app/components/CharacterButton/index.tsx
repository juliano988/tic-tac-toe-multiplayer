import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export default function CharacterButton(props: {
  selectedEmojis: Array<string>,
  emoji: string
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {

  return (

    <button disabled={props.selectedEmojis?.includes(props.emoji) ? true : false} className={`text-5xl transition-all ${props.selectedEmojis?.includes(props.emoji) && 'opacity-50 cursor-not-allowed'}`} {...props}>
      {props.emoji}
    </button>

  )

}