import { useCallback, useState } from "react";
import Button from "./components/Button";
import Text from "./components/Text";
import Input from "./components/Input";
import Checkbox from "./components/Checkbox";
import Radio, { formatBoldText } from "./components/Radio";
import RadioButton from "./components/RadioButton";
import Select from "./components/Select";
import Switch from "./components/Switch";
import AddToCart from "./components/AddToCart";
import PriceText from "./components/PriceText";

import {
  Plus,
  MinusCircle,
  FilterIcon,
  Phone,
  CreditCardIcon,
} from "lucide-react";
import "./styles/global.scss";
import Modal, { Button as ButtonType } from "./components/Modal";
import Range from "./components/Range";
import ProgressBar from "./components/ProgressBar";

function App() {
  const [selectedOption, setSelectedOption] = useState("option1");
  const [selectedButtonVariant, setSelectedButtonVariant] =
    useState("filled-1");
  const [selectedOrangeVariant, setSelectedOrangeVariant] =
    useState("orange-1");
  const [selectedSelect, setSelectedSelect] = useState<string | Array<string>>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const buttons: Array<ButtonType> = [
    {
      text: "İptal",
      onClick: () => setIsModalOpen(false),
      variant: "light-purple",
    },
    {
      text: "Onayla",
      onClick: () => alert("Onaylandı"),
      variant: "purple",
    },
  ];

  const onChange = useCallback((value: number) => {
    console.log(value);
  }, []);

  return (
    <>
      <div className="row">
        <h2>Progress Bar</h2>
        <ProgressBar value={70} fillColor="red" />
      </div>
      <div className="row">
        <h2>Range</h2>
        <Range minValue={60} maxValue={100} onChange={onChange} />
      </div>
      <div className="row">
        <h2>Buttons</h2>
        <div className="wrapper">
          <Button title="Modal Aç" onClick={() => setIsModalOpen(true)} />
          <Modal
            title="Modal Başlığı"
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            buttons={buttons}
          >
            <p>
              Modal içeriği buraya gelecek.Modal içeriği buraya gelecek.Modal
              içeriği buraya gelecek.Modal içeriği buraya gelecek.Modal içeriği
              buraya gelecek.
            </p>
          </Modal>
          <Button
            title="İlan Detayına Git"
            className="full-width"
            onClick={() => alert("Detaya Gidildi")}
          />
          <Button
            variant="red"
            title="Sepete Ekle"
            onClick={() => alert("Eklendi")}
          />
          <Button
            variant="light"
            title="Sepete Ekle"
            onClick={() => alert("Eklendi")}
          />
          <Button
            variant="light-purple"
            title="Sepete Ekle"
            onClick={() => alert("Eklendi")}
          />
          <Button
            variant="ghost purple"
            title="Sonraki Sayfa"
            onClick={() => alert("Eklendi")}
          />
          <Button
            variant="white"
            title="Sepete Ekle"
            onClick={() => alert("Eklendi")}
            leftIcon={<FilterIcon />}
          />
          <Button
            title="İlan Detayına Git"
            disabled
            onClick={() => alert("deneme")}
            leftIcon={<Plus />}
            rightIcon={<MinusCircle />}
          />
        </div>
      </div>

      <div className="row">
        <h2>Texts</h2>
        <div className="wrapper">
          <Text> Playwright Automation Test Product Miatlı 2</Text>
          <Text size="xxl" weight="regular" color="orange">
            Playwright Automation Test Product Miatlı 2
          </Text>
          <Text type="h1"> Playwright Automation Test Product Miatlı 2</Text>
          <Text type="h2"> Playwright Automation Test Product Miatlı 2</Text>
          <Text type="h3" color="purple">
            Playwright Automation Test Product Miatlı 2
          </Text>
          <Text type="h4" color="purple">
            Playwright Automation Test Product Miatlı 2
          </Text>
          <Text type="h5" weight="regular" color="green">
            Playwright Automation Test Product Miatlı 2
          </Text>
          <Text size="xl" weight="regular" color="orange">
            Deneme 2
          </Text>
        </div>
      </div>

      <div className="row">
        <h2>Inputs</h2>
        <div className="wrapper">
          <Input required label="Ad" placeholder="Adınız" icon={<Phone />} />

          <Input
            required
            type="phone"
            label="Telefon"
            placeholder="0 (XXX) XXX XX XX"
            icon={<Phone />}
          />

          <Input
            type="iban"
            label="IBAN"
            placeholder="TR00 0000 0000..."
            icon={<CreditCardIcon />}
          />

          <Input
            type="mersisNumber"
            label="Mersis Numarası"
            placeholder="Ör: 1234-1234-1234-12"
            icon={<CreditCardIcon />}
          />
        </div>
      </div>

      <div className="row">
        <h2>Checkboxes</h2>
        <div className="wrapper">
          <Checkbox
            label="Beni hatırla"
            onChange={(checked) => console.log(checked)}
          />
          <Checkbox
            label="Beni hatırla"
            checked
            onChange={(checked) => console.log(checked)}
          />
          <Checkbox
            label="Beni hatırla"
            checked
            variant="blue"
            onChange={(checked) => console.log(checked)}
          />
          <Checkbox
            label="Beni hatırla"
            variant="blue"
            onChange={(checked) => console.log(checked)}
          />
          <Checkbox
            label="Beni hatırla"
            onChange={(checked) => console.log(checked)}
          />
          <Checkbox
            label="Beni hatırla"
            disabled
            onChange={(checked) => console.log(checked)}
          />

          <Checkbox
            label="Beni hatırla"
            variant="blue"
            checked
            disabled
            onChange={(checked) => console.log(checked)}
          />
        </div>
      </div>

      <div className="row">
        <h2>Radios</h2>
        <div className="wrapper">
          <Radio
            label="Seçenek 1"
            subLabel="Alt bilgi olarak bunu kullanabiliriz."
            name="options"
            value="option1"
            checked={selectedOption === "option1"}
            onChange={(e) => setSelectedOption(e.target.value)}
          />

          <Radio
            label="Kargo Seçimi"
            name="options"
            value="option2"
            checked={selectedOption === "option2"}
            onChange={(e) => setSelectedOption(e.target.value)}
            disabled={false}
          />

          <Radio
            showChangeButton
            changeButtonOnClick={() => alert("tıklandı")}
            label="2500 TL ve üzeri kargo bedava"
            isLabelBoldPrice={true} // "2500 TL" otomatik bold olacak (pattern)
            checked={selectedOption === "option3"}
            value="option3"
            onChange={(e) => setSelectedOption(e.target.value)}
          />

          <Radio
            label="Kargo kampanyası yapmak istemiyorum!"
            disabled
            onChange={(e) => setSelectedOption(e.target.value)}
          />

          <Radio
            value="option4"
            label={
              <div className={"campaign__label"}>
                {formatBoldText("Kargo ücreti 2500 TL ve üzeri bedava!")}
              </div>
            }
            checked={selectedOption === "option4"}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <h2>Radio Buttons</h2>
        <div className="wrapper">
          <div className="grup">
            <RadioButton
              label="Seçenek 1"
              value="filled-1"
              checked={selectedButtonVariant === "filled-1"}
              onChange={() => setSelectedButtonVariant("filled-1")}
              name="filled-options"
            />
            <RadioButton
              label="Seçenek 2"
              value="filled-2"
              checked={selectedButtonVariant === "filled-2"}
              onChange={() => setSelectedButtonVariant("filled-2")}
              name="filled-options"
            />
            <RadioButton
              label="Seçenek 3"
              value="filled-3"
              checked={selectedButtonVariant === "filled-3"}
              onChange={() => setSelectedButtonVariant("filled-3")}
              name="filled-options"
            />
            <RadioButton
              label="Pasif"
              disabled
              value="filled-4"
              name="filled-options"
            />
          </div>

          <div className="grup">
            <RadioButton
              label="Seçenek 1"
              variant="orange"
              value="orange-1"
              checked={selectedOrangeVariant === "orange-1"}
              onChange={() => setSelectedOrangeVariant("orange-1")}
              name="orange-options"
            />
            <RadioButton
              label="Seçenek 2"
              variant="orange"
              value="orange-2"
              checked={selectedOrangeVariant === "orange-2"}
              onChange={() => setSelectedOrangeVariant("orange-2")}
              name="orange-options"
            />
            <RadioButton
              label="Seçenek 3"
              variant="orange"
              value="orange-3"
              checked={selectedOrangeVariant === "orange-3"}
              onChange={() => setSelectedOrangeVariant("orange-3")}
              name="orange-options"
            />
            <RadioButton
              label="Pasif"
              variant="orange"
              disabled
              value="orange-4"
              name="orange-options"
            />
          </div>
        </div>
      </div>

      <div className="row">
        <h2>Select</h2>
        <div className="wrapper">
          <Select
            label="Kategori Seç"
            required
            placeholder="Seçim yapın"
            options={[
              { value: "option1", label: "Seçenek 1" },
              { value: "option2", label: "Seçenek 2" },
              { value: "option3", label: "Seçenek 3" },
              { value: "option4", label: "Seçenek 4" },
              { value: "option5", label: "Seçenek 5" },
            ]}
            value={selectedSelect}
            onChange={setSelectedSelect}
            hint="Lütfen bir seçenek seçiniz"
            multiple
          />
        </div>

        <div className="wrapper" style={{ marginTop: "20px" }}>
          <Select
            label="Disabled Select"
            placeholder="Seçim yapın"
            disabled
            options={[
              { value: "option1", label: "Seçenek 1" },
              { value: "option2", label: "Seçenek 2" },
            ]}
            value={selectedSelect}
            onChange={setSelectedSelect}
          />
        </div>
      </div>

      <div className="row">
        <h2>Switches</h2>
        <div className="wrapper">
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <div>
              <Switch
                label="Kampanyalı Birim Fiyat Göster"
                checked={true}
                onChange={(checked) =>
                  console.log(checked ? "seçildi" : "seçilmedi")
                }
              />
            </div>
            <div>
              <Switch label="Pasif" checked={false} onChange={() => {}} />
            </div>
            <div>
              <Switch label="Disabled" checked={true} disabled />
            </div>
            <div>
              <Switch
                label="Large"
                size="large"
                checked={false}
                onChange={() => {}}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <h2>Add To Cart</h2>
        <div className="wrapper">
          <div>
            <AddToCart
              maxValue={6}
              onAddToCart={() => console.log("Sepete eklendi")}
              onQuantityChange={(qty) => console.log(`Adet: ${qty}`)}
              onRemoveFromCart={() => console.log("Sepetten kaldırıldı")}
            />
          </div>
          <div>
            <AddToCart
              size="lg"
              isSelectedCount={8}
              maxValue={10}
              onAddToCart={() => console.log("Sepete eklendi")}
              onQuantityChange={(qty) => console.log(`Adet: ${qty}`)}
              onRemoveFromCart={() => console.log("Sepetten kaldırıldı")}
            />
          </div>

          <div>
            <AddToCart
              variant="gray"
              onAddToCart={() => console.log("Sepete eklendi")}
              onQuantityChange={(qty) => console.log(`Adet: ${qty}`)}
              onRemoveFromCart={() => console.log("Sepetten kaldırıldı")}
            />
          </div>
          <div>
            <AddToCart
              size="lg"
              variant="gray"
              onAddToCart={() => console.log("Sepete eklendi")}
              onQuantityChange={(qty) => console.log(`Adet: ${qty}`)}
              onRemoveFromCart={() => console.log("Sepetten kaldırıldı")}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <h2>Price Text</h2>
        <div className="wrapper">
          <div>
            <PriceText price={584.1} />
          </div>
          <div></div>
          <div>
            <PriceText
              price={584.1}
              size={18}
              variant="purple"
              weight="bold"
              isCrossOut={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
