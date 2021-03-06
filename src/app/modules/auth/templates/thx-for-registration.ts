import { config } from '../../../config';
import { MjmlResult } from '../../../models/email';
import { mjmlConverter } from '../../../utils';

export const thxForRegistrationMail = (
  firstname: string,
  lastname: string
): MjmlResult => mjmlConverter(`<mjml>
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
            Дякуюємо за реєстрацію!
          </mj-text>
        </mj-column>
      </mj-section>

      <mj-section
        full-width="full-width"
        background-color="#FFFFFF">
        <mj-column padding="0 30px">
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
            Протягом робочого дня ви отримаєте E-mail з результатом.
            Якщо заявка буде прийнята, ви отримаєте доступ до аплікаці.
            Використовуйте логін та пароль, які були вказані Вами під час реєстрації.
          </mj-text>

          <mj-spacer height="30px" />

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
            color="#FFFFFF">Якщо у вас залишились запитання, надішліть їх адміністратору на електронну скриньку:
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
  </mjml>`);
