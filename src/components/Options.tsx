import { MdOutlineInvertColorsOff } from "react-icons/md"


interface Props {
  handleClickOptions: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}


export const Options: React.FC<Props> = ({ handleClickOptions }) => {
  return (
    <div className="color-options-group">
      <div className="color-default-option color-option" role="option" aria-selected={"false"} aria-labelledby="color-default" tabIndex={0} aria-label="color-default" onClick={handleClickOptions}>
        <MdOutlineInvertColorsOff size="25" />
      </div>
      <div className="color-automatic color-option" role="option" aria-selected={"false"} aria-labelledby="color-automatic" tabIndex={0} aria-label="color-automatic" onClick={handleClickOptions} />
      <div className="color-red color-option" role="option" aria-selected={"false"} aria-labelledby="color-red" tabIndex={0} aria-label="color-red" onClick={handleClickOptions} />
      <div className="color-orange color-option" role="option" aria-selected={"false"} aria-labelledby="color-orange" tabIndex={0} aria-label="color-orange" onClick={handleClickOptions} />
      <div className="color-yellow color-option" role="option" aria-selected={"false"} aria-labelledby="color-yellow" tabIndex={0} aria-label="color-yellow" onClick={handleClickOptions} />
      <div className="color-green color-option" role="option" aria-selected={"false"} aria-labelledby="color-green" tabIndex={0} aria-label="color-green" onClick={handleClickOptions} />
      <div className="color-greenish-blue color-option" role="option" aria-selected={"false"} aria-labelledby="color-greenish-blue" tabIndex={0} aria-label="color-greenish-blue" onClick={handleClickOptions} />
      <div className="color-blue color-option" role="option" aria-selected={"false"} aria-labelledby="color-blue" tabIndex={0} aria-label="color-blue" onClick={handleClickOptions} />
      <div className="color-purple color-option" role="option" aria-selected={"false"} aria-labelledby="color-purple" tabIndex={0} aria-label="color-purple" onClick={handleClickOptions} />
      <div className="color-grey color-option" role="option" aria-selected={"false"} aria-labelledby="color-grey" tabIndex={0} aria-label="color-grey" onClick={handleClickOptions} />
    </div>
  )
}

