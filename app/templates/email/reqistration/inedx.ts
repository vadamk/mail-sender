import mjml2html from 'mjml';
import { config } from '../../../config';

export const requestAccept = (firstname: string, lastname: string): string => {
  return mjml2html(`<mjml>
    <mj-head>
      <mj-font
        name="Lato"
        href="https://fonts.googleapis.com/css?family=Lato" />
    </mj-head>
    <mj-body>

      <mj-section
        full-width="full-width"
        border="none"
        padding-top="60px"
        padding-bottom="0px"
        background-color="#F1C232">
        <mj-column
          padding="45px 0 15px"
          border="none"
          background-color="#FFFFFF">
          <mj-text
            font-size="48px"
            align="center"
            font-family="Lato, Arial">
            Вітаємо
          </mj-text>
        </mj-column>
      </mj-section>

      <mj-section
        full-width="full-width"
        background-color="#FFFFFF">
        <mj-column>
          <mj-text
            font-size="18px"
            line-height="27px"
            font-family="Lato, Arial">
            ${firstname} ${lastname},
          </mj-text>
          <mj-text
            font-size="18px"
            line-height="27px"
            font-family="Lato, Arial">
            Ваш запит на реєстрацію прийнятий. Це значить, що тепер у Вас є можливість здійснювати розсилки у нашій аплікації.
          </mj-text>

          <mj-spacer height="30px" />

          <mj-button
            href="${config.home}"
            font-size="20px"
            background-color="#F1C232"
            line-height="27px"
            font-family="Lato, Arial">
            Перейти в аплікацію
          </mj-button>
        </mj-column>
      </mj-section>

      <mj-spacer height="30px" />

      <mj-section
        full-width="full-width"
        background-color="#000000">
        <mj-column>
          <mj-text
            font-size="24px"
            line-height="27px"
            color="#FFFFFF">Виникли запитання?</mj-text>
          <mj-text
            font-size="18px"
            line-height="27px"
            color="#FFFFFF">Більше дізнатися ви може надіславши лист адміністратору на електронну скриньку:
          </mj-text>
          <mj-text
            href="mailto:${config.admin}"
            font-size="20px"
            text-decoration="underline"
            line-height="27px"
            color="#E69138">
            ${config.admin}
          </mj-text>
        </mj-column>
      </mj-section>

    </mj-body>
  </mjml>`).html;
};
