import { FC } from "react"

interface StarfleetLogoProps {
  theme?: "dark" | "light"
  scale?: number
  size?: number
}

export const StarfleetLogo: FC<StarfleetLogoProps> = ({
  theme,
  scale = 1,
  size = 80
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 58 58"
    >
      <g data-name="Group 68826">
        <g
          data-name="Group 68143"
          transform="translate(-129 -329) translate(88.73 243.768)"
        >
          <rect
            data-name="Rectangle 4759"
            width={58}
            height={58}
            rx={6}
            transform="translate(40.27 85.232)"
            fill="#ffb713"
          />
          <path
            d="M32.664 15.007c.624 0 .756-.339.321-.731L17.48.383a1.253 1.253 0 00-1.645 0L.273 14.311c-.454.41-.3.731.321.731h5.087a3.333 3.333 0 001.948-.731l4.633-4.262c.454-.41.813-.268.813.321v12.181a1.078 1.078 0 001.135 1.034h4.916a1.078 1.078 0 001.135-1.034l-.038-12.2c0-.589.359-.731.813-.321l4.614 4.227a3.353 3.353 0 001.948.749z"
            transform="translate(52.612 96.048) translate(-.011 -.075)"
            fill="#1a1e27"
          />
          <g data-name="group">
            <path
              data-name="path"
              d="M27.353 118c-.624 0-1.078.357-1.078.8v.41c0 4.958-4.292 8.971-9.549 8.971s-9.549-4.013-9.549-8.971v-.41c.189-.446-.34-.8-.964-.8H1.335A1.107 1.107 0 00.2 119.07v13.2a1.107 1.107 0 001.135 1.07h31.01a1.107 1.107 0 001.135-1.07v-13.2a1.107 1.107 0 00-1.135-1.07z"
              transform="translate(52.612 96.048) translate(.036 21.031) translate(-.2 -118)"
              fill="#1a1e27"
            />
          </g>
          <path
            data-name="path"
            d="M72.774 44.165c-1.967 0-3.574-1.237-3.574-2.751V29.451c0-1.514 1.607-2.751 3.574-2.751 1.966 0 3.574 1.237 3.574 2.751v11.963c-.001 1.514-1.608 2.751-3.574 2.751z"
            transform="translate(52.612 96.048) translate(-56.117 -18.015)"
            fill="#1a1e27"
          />
        </g>
      </g>
    </svg>
  )
}
