import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

const Contacts = () => {
  return (
    <section className="w-full px-4 py-12 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">📇 Контакты</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Контактная информация */}
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-semibold text-gray-700">
                Греческий Культурный Центр
              </h3>
              <p className="text-gray-600">
                (бывш. Ташкентское Городское Общество Греческой Культуры)
              </p>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="text-blue-600 mt-1" />
              <p>ул. Юсуфа Хос Ходжиба, 30А, 100031, Ташкент, Узбекистан</p>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="text-green-600 mt-1" />
              <div>
                <p>+998 97 733 33 04</p>
                <p>+998 90 123 28 64</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="text-red-600 mt-1" />
              <p>greekcentre@mail.ru</p>
            </div>

            

            <div>
              <h4 className="font-medium mt-6 mb-2">🕒 Режим работы:</h4>
              <ul className="text-sm text-gray-700">
                <li>Пн – Пт: 10:00 – 17:00</li>
                <li>Суббота: 10:00 – 14:00</li>
                <li>Воскресенье: 10:00 – 19:00</li>
              </ul>
            </div>
          </div>

          {/* Яндекс Карта */}
          <div className="w-full h-80">
           <iframe
  src="https://yandex.ru/map-widget/v1/?ll=69.260926%2C41.300502&mode=whatshere&whatshere%5Bpoint%5D=69.260926%2C41.300502&z=17"
  width="100%"
  height="100%"
  frameborder="0"
  allowfullscreen
  class="rounded-xl shadow-lg"
  title="Греческий Культурный Центр на карте"
></iframe>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
