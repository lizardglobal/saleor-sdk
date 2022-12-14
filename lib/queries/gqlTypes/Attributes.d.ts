export interface Attributes_attributes_edges_node_choices_edges_node {
    __typename: "AttributeValue";
    /**
     * The ID of the object.
     */
    id: string;
    /**
     * Name of a value displayed in the interface.
     */
    name: string | null;
    /**
     * Internal representation of a value (unique per attribute).
     */
    slug: string | null;
}
export interface Attributes_attributes_edges_node_choices_edges {
    __typename: "AttributeValueCountableEdge";
    /**
     * The item at the end of the edge.
     */
    node: Attributes_attributes_edges_node_choices_edges_node;
}
export interface Attributes_attributes_edges_node_choices {
    __typename: "AttributeValueCountableConnection";
    edges: Attributes_attributes_edges_node_choices_edges[];
}
export interface Attributes_attributes_edges_node {
    __typename: "Attribute";
    /**
     * The ID of the object.
     */
    id: string;
    /**
     * Name of an attribute displayed in the interface.
     */
    name: string | null;
    /**
     * Internal representation of an attribute name.
     */
    slug: string | null;
    /**
     * List of attribute's values.
     */
    choices: Attributes_attributes_edges_node_choices | null;
}
export interface Attributes_attributes_edges {
    __typename: "AttributeCountableEdge";
    /**
     * The item at the end of the edge.
     */
    node: Attributes_attributes_edges_node;
}
export interface Attributes_attributes {
    __typename: "AttributeCountableConnection";
    edges: Attributes_attributes_edges[];
}
export interface Attributes {
    /**
     * List of the shop's attributes.
     */
    attributes: Attributes_attributes | null;
}
export interface AttributesVariables {
    id: string;
    channel?: string | null;
}
