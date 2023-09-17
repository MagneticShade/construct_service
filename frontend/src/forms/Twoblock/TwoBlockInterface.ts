interface Module {
    background: string;
    header: string;
    id: string;
    order: string;
    subHeader: string;
    textAlign?: string;
    textColor: string;
}


export interface ITwoBlockProps {
    background: string;
    id: string;
    localId: string;
    module: Module[];
    name: string;
    order: string;
    textAlign?: string;
}
