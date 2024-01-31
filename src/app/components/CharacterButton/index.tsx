import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export default function CharacterButton(props: { emoji: string } & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {

  return (

    <button {...props}>
      {props.emoji}
    </button>

  )

}