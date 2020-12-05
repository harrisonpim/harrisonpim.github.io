import { RichText } from "prismic-reactjs";
import Block from "./block";

export default function Tools({ data }) {

  const renderedTools = data.data.body.map((tool) => (
    <div>
      {RichText.asText(tool.primary.category)}:{" "}
      {RichText.asText(tool.primary.set)}
    </div>
  ));

  return <Block heading="Tools I Use" data={renderedTools} />;
}