﻿import ts = require( "typescript" );

export function forEach<T, U>( array: T[], callback: ( element: T, index: number ) => U ): U {
    if ( array ) {
        for ( let i = 0, len = array.length; i < len; i++ ) {
            let result = callback( array[i], i );
            if ( result ) {
                return result;
            }
        }
    }
    return undefined;
}

let hasOwnProperty = Object.prototype.hasOwnProperty;

export function hasProperty<T>( map: ts.Map<T>, key: string ): boolean {
    return hasOwnProperty.call( map, key );
}

export function clone<T>( object: T ): T {
    let result: any = {};
    for ( let id in object ) {
        result[id] = ( <any>object )[id];
    }
    return <T>result;
}

export function createDiagnostic( message: any ): ts.Diagnostic {
    if ( arguments.length > 1 ) {
        message = formatStringFromArgs( message, arguments, 1 );
    }

    return {
        file: undefined,
        start: undefined,
        length: undefined,
        messageText: message,
        category: undefined,
        code: undefined
    };
} 

function formatStringFromArgs( text: string, args: any, baseIndex: number ) {
    baseIndex = baseIndex || 0;
    return text.replace( /{(\d+)}/g, function ( match: any, index: any ) {
        return args[+index + baseIndex];
    });
}

export function isDeclarationFile( file: ts.SourceFile ): boolean {
    return ( file.flags & ts.NodeFlags.DeclarationFile ) !== 0;
}

export function normalizeSlashes( path: string ): string {
    return path.replace( /\\/g, "/" );
}

export function outputExtension( path: string ): string {
    return path.replace( /\.ts/, ".js" );
}