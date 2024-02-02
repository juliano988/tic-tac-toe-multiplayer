import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export default function CharacterButton(props: { emoji: string } & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {

  return (

    <button className="text-5xl" {...props}>
      {props.emoji}
    </button>

  )

}