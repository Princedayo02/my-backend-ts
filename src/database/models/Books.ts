import { Column, Table, Model, DataType, PrimaryKey, AutoIncrement, AllowNull, BelongsTo } from "sequelize-typescript";
import Author from "./Authors";
import Genre from "./Genre";

//title, authorId proofRead isbn  genreId
@Table({ timestamps: true })
class Book extends Model {
	@PrimaryKey
	@Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
	declare id: string;

	@Column({ type: DataType.DATE, allowNull: true })
	declare year: string;

	@Column({ type: DataType.BOOLEAN })
	declare proofRead: boolean;

	@Column({ type: DataType.STRING })
	declare isbn: string;

	@BelongsTo(() => Author, "authorId")
	declare author: number;

	@BelongsTo(() => Genre, "genreId")
	declare genred: number;
}

export default Book;
